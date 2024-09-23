<?php

namespace App\Service;

use App\Events\UserRecoverPassword;
use App\Exceptions\GeneralExceptionCatch;
use App\Exceptions\UserException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\UserResource;
use App\Jobs\SendRecoverPasswordEmailJob;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class UserService
{

    private $request;
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function login(array $data)
    {
        try {
            if (!Auth::attempt($data)) {
                return response()->json(['message' => 'Email ou senha incorreta.']);
            }
            $token = $this->request->user()->createToken('')->plainTextToken;
            return new GeneralResource(['token' => $token]);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, login');
        }
    }

    public function logout()
    {
        try {
            $this->request->user()->currentAccessToken()->delete();
            return new GeneralResource(['message' => 'Logged out']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, logout');
        }
    }

    public function store(array $data)
    {
        try {
            $data['password'] = Hash::make($data['password']);
            User::create($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, store');
        }
    }

    public function show()
    {
        try {
            $user = Auth::user();
            $find = User::findOrFail($user->idUser);
            return new UserResource($find);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, show');
        }
    }

    public function update(array $data)
    {
        try {
            $user = Auth::user();
            if (!Hash::check($data['password'], $user->password)) {
                return new GeneralResource(['message' => 'incorrect password']);
            }
            $data['password'] = $user->password;
            User::where('idUser', $user->idUser)->update($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, update');
        }
    }

    public function destroy()
    {
        try {
            $user = Auth::user();
            User::findOrFail($user->idUser)->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, destroy');
        }
    }

    public function sendTokenRecover(string $email)
    {
        try {
            $user = User::where('email', $email)->first();
            if (!$user)
                return new GeneralResource(['message' => 'user not found']);
            $token = strtoupper(Str::random(60));
            $table = DB::table('password_reset_tokens')->where('email', $email)->first();
            if (!$table) {
                DB::table('password_reset_tokens')->insert([
                    'email' => $email,
                    'token' => $token,
                    'created_at' => now(),
                ]);
            } else {
                DB::table('password_reset_tokens')->update([
                    'token' => $token,
                    'created_at' => now(),
                ]);
            }
            // dispatch(new SendRecoverPasswordEmailJob($user->email, $token)); // Para colocar o envio do e-mail em segundo plano
            event(new UserRecoverPassword($user->email, $token));

            return new GeneralResource(['message' => 'send e-mail']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, send email recover password');
        }
    }
    public function resetPassword(array $data)
    {
        try {
            $passwordResetTokens = DB::table('password_reset_tokens')->where('token', $data['token'])->first();
            if (!isset($passwordResetTokens)) throw new UserException("Token invalid");

            User::where('email', $passwordResetTokens->email)->update([
                'password' => Hash::make($data['password']),
            ]);
            DB::table('password_reset_tokens')->where('token', $data['token'])->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, reset password');
        }
    }
}

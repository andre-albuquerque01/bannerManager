<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\RecoverPasswordRequest;
use App\Http\Requests\UserRequest;
use App\Service\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function login(AuthRequest $request)
    {
        return $this->userService->login($request->validated());
    }
    public function logout()
    {
        return $this->userService->logout();
    }
    public function store(UserRequest $request)
    {
        return $this->userService->store($request->validated());
    }
    public function show()
    {
        return $this->userService->show();
    }
    public function update(UserRequest $request)
    {
        return $this->userService->update($request->validated());
    }
    public function destroy()
    {
        return $this->userService->destroy();
    }
    public function sendTokenRecover(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        return $this->userService->sendTokenRecover($request->email);
    }
    public function resetPassword(RecoverPasswordRequest $request)
    {
        return $this->userService->resetPassword($request->validated());
    }
}

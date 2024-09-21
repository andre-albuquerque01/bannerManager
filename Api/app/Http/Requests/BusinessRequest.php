<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BusinessRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            "campanha" => [
                "required",
                "max:100",
            ],
            "cliente" => [
                "required",
                "max:100",
            ],
            "agencia" => [
                "required",
                "max:100",
            ],
            "destaque" => [
                "nullable",
                "max:100",
            ],
        ];

        if ($this->method() == 'PUT') {
            $rules["campanha"] = [
                "nullable",
                "max:100",
            ];
            $rules["cliente"] = [
                "nullable",
                "max:100",
            ];
            $rules["agencia"] = [
                "nullable",
                "max:80",
            ];
            $rules["destaque"] = [
                "nullable",
            ];
        }

        return $rules;
    }
}

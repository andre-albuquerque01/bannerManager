<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BannerRequest extends FormRequest
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
            "nameMidia" => [
                "required",
                // "max:2048",
            ],
            "veiculo" => [
                "nullable",
                "min:1",
                "max:60",
            ],
            "dimensao" => [
                "nullable",
            ],
            "looping" => [
                "nullable",
                "min:1",
                "max:40",
            ],
            "tempo" => [
                "nullable",
            ],
            "complexidade" => [
                "nullable",
                "min:1",
                "max:40",
            ],
            "tipo" => [
                "nullable",
                "min:1",
                "max:40",
            ],
            "statusBanner" => [
                "nullable",
                "min:1",
                "max:80",
            ],
        ];

        if ($this->method() == 'PUT') {
            $rules["nameMidia"] = [
                "nullable",
                "max:2048",
            ];
        }

        return $rules;
    }
}

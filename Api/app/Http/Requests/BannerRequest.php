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
            "title" => [
                "required",
                "max:100",
            ],
            "veiculo" => [
                "nullable",
                "min:1",
                "max:60",
            ],
            "dimensao" => [
                "nullable",
            ],
            "tempo" => [
                "nullable",
            ],
            "extensionMidia" => [
                "required",
                "min:1",
                "max:80",
            ],
            "tamanho" => [
                "required",
                "min:1",
                "max:80",
            ],
            "tipo" => [
                "nullable",
                "min:1",
                "max:40",
            ],
            "urlMidia" => [
                "required",
                "min:1",
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
                "max:100",
            ];
            $rules["urlMidia"] = [
                "nullable",
            ];
            $rules["extensionMidia"] = [
                "nullable",
                "max:80",
            ];
            $rules["tamanho"] = [
                "nullable",
                "max:80",
            ];
        }

        return $rules;
    }
}

<?php

namespace App\Http\Requests\API;

use Illuminate\Foundation\Http\FormRequest;

class AccessesStoreRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'country' => 'required',
            'date_time' => 'required|date_format:Y-m-d H:i:s'
        ];
    }

    public function messages()
    {
        return [
            'country.required' => 'O campo país não pode ficar em branco.',
            'date_time.required' => 'O campo data não pode ficar em branco.',
            'date_time.date_format' => 'O campo data deve estar no formato Y-m-d H:i:s.'
        ];
    }
}

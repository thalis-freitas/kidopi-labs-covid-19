<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Access;
use App\Http\Requests\API\AccessesStoreRequest;


class AccessesController extends Controller
{
    public function __construct(private Access $access)
    {
    }

    public function last()
    {
        $access = $this->access->all()->sortByDesc('id')->first();
        return response()->json($access);
    }

    public function store(AccessesStoreRequest $request)
    {
        $access = $this->access->create($request->all());
        return response()->json([
            "message" => "Acesso registrado com sucesso!",
            "data" => $access
        ], 201);
    }
}

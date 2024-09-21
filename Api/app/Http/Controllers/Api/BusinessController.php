<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BusinessRequest;
use App\Service\BusinessService;
use Illuminate\Http\Request;

class BusinessController extends Controller
{
    private $businessService;

    public function __construct(BusinessService $businessService)
    {
        $this->businessService = $businessService;
    }

    public function index()
    {
        return $this->businessService->index();
    }
    public function indexAll()
    {
        return $this->businessService->indexAll();
    }
    public function show(string $id)
    {
        return $this->businessService->show($id);
    }
    public function store(BusinessRequest $request)
    {
        return $this->businessService->store($request->validated());
    }
    public function update(BusinessRequest $request, string $id)
    {
        return $this->businessService->update($request->validated(), $id);
    }
    public function destroy(string $id)
    {
        return $this->businessService->destroy($id);
    }
}

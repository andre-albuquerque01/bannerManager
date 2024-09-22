<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BannerRequest;
use App\Service\BannerService;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    private $bannerService;

    public function __construct(BannerService $bannerService)
    {
        $this->bannerService = $bannerService;
    }

    public function index()
    {
        return $this->bannerService->index();
    }
    public function show(string $id)
    {
        return $this->bannerService->show($id);
    }
    public function store(BannerRequest $request)
    {
        return $this->bannerService->store($request->validated());
    }
    public function update(BannerRequest $request, string $id)
    {
        return $this->bannerService->update($request->validated(), $id);
    }
    public function destroy(string $id)
    {
        return $this->bannerService->destroy($id);
    }
    public function downloadImage(string $id)
    {
        return $this->bannerService->downloadImage($id);
    }
}

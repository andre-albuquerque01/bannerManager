<?php

namespace App\Service;

use App\Exceptions\GeneralExceptionCatch;
use App\Http\Resources\BannerResource;
use App\Http\Resources\GeneralResource;
use App\Models\Banner;

class BannerService
{
    public function index()
    {
        try {
            $banner = Banner::latest('updated_at')->paginate(25);
            return BannerResource::collection($banner);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, index');
        }
    }

    public function show(string $id)
    {
        try {
            $banner = Banner::findOrFail($id);
            return new BannerResource($banner);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, show');
        }
    }

    public function store(array $data)
    {
        try {
            Banner::create($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, store');
        }
    }

    public function update(array $data, string $id)
    {
        try {
            $banner = Banner::where('idBanner', $id)->first();

            if (!$banner) {
                return new GeneralResource(["message" => "not found"]);
            }
            $banner->update($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, store');
        }
    }

    public function destroy(string $id)
    {
        try {
            $banner = Banner::where('idBanner', $id)->first();

            if (!$banner) {
                return new GeneralResource(["message" => "Unathorized"]);
            }
            $banner->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, destroy');
        }
    }

    public function downLoadImage(string $id)
    {
        try {
            $banner = Banner::where('idBanner', $id)->first();
            return response()->download($banner->urlMidia,  $banner->title);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, downloadImage');
        }
    }
}

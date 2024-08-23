<?php

namespace App\Service;

use App\Exceptions\GeneralExceptionCatch;
use App\Http\Resources\BannerResource;
use App\Http\Resources\GeneralResource;
use App\Models\Banner;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
            if (isset($data['nameMidia'])) {
                $media = $data['nameMidia'];
                $extension = $media->getClientOriginalExtension();
                $originalName = pathinfo($media->getClientOriginalName(), PATHINFO_FILENAME);

                if ($extension != null) {
                    $sizeInBytes = $media->getSize();
                    $data['tamanho'] = $this->formatSizeUnits($sizeInBytes);
                    $data['complexidade'] = strtoupper($extension);
                    $filename = $originalName . '.' . $extension;
                    Storage::disk('public')->put('img/banner/' . $filename, file_get_contents($media));
                    $data['nameMidia'] = $filename;
                }
            } else {
                $data['nameMidia'] = null;
            }

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
                return new GeneralResource(["message" => "Unathorized"]);
            }

            if (isset($data['nameMidia'])) {
                $media = $data['nameMidia'];
                $extension = $media->getClientOriginalExtension();
                $originalName = pathinfo($media->getClientOriginalName(), PATHINFO_FILENAME);

                if ($extension != null) {
                    $sizeInBytes = $media->getSize();
                    $data['tamanho'] = $this->formatSizeUnits($sizeInBytes);
                    $data['complexidade'] = strtoupper($extension);
                    $filename = $originalName . '.' . $extension;
                    Storage::disk('public')->put('img/banner/' . $filename, file_get_contents($media));
                    $data['nameMidia'] = $filename;
                } else {
                    $data['nameMidia'] = $banner->nameMidia;
                }
            } else {
                $data['nameMidia'] = $banner->nameMidia;
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
            $path = storage_path('app/public/img/banner/' . $banner->nameMidia);
            return response()->download($path,  $banner->nameMidia);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, downLoadImage');
        }
    }

    private function formatSizeUnits($bytes)
    {
        if ($bytes >= 1073741824) {
            $bytes = number_format($bytes / 1073741824, 2) . ' GB';
        } elseif ($bytes >= 1048576) {
            $bytes = number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            $bytes = number_format($bytes / 1024, 2) . ' KB';
        } elseif ($bytes > 1) {
            $bytes = $bytes . ' bytes';
        } elseif ($bytes == 1) {
            $bytes = $bytes . ' byte';
        } else {
            $bytes = '0 bytes';
        }

        return $bytes;
    }
}

<?php

namespace App\Service;

use App\Exceptions\GeneralExceptionCatch;
use App\Http\Resources\GeneralResource;
use App\Models\Business;

class BusinessService
{
    public function index()
    {
        try {
            $business = Business::where('destaque', 1)->get();
            return new GeneralResource($business);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, index');
        }
    }
    public function indexAll()
    {
        try {
            return new GeneralResource(Business::get());
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, index');
        }
    }

    public function show(string $id)
    {
        try {
            $business = Business::findOrFail($id);
            return new GeneralResource($business);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, show');
        }
    }

    public function store(array $data)
    {
        try {
            if((int)$data['destaque'] == 1) {
                Business::where('destaque', 1)->update(['destaque' => 0]);
            }
            Business::create($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, store');
        }
    }

    public function update(array $data, string $id)
    {
        try {
            $business = Business::where('idBusiness', $id)->first();

            if (!$business) {
                return new GeneralResource(["message" => "not found"]);
            }
            if((int)$data['destaque'] == 1) {
                Business::where('destaque', 1)->update(['destaque' => 0]);
            }
            
            $business->update($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, update');
        }
    }

    public function destroy(string $id)
    {
        try {
            $business = Business::where('idBusiness', $id)->first();

            if (!$business) {
                return new GeneralResource(["message" => "Unathorized"]);
            }
            $business->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new GeneralExceptionCatch('Error, destroy');
        }
    }

}

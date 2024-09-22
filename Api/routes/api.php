<?php

use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\BusinessController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::post('userStore', [UserController::class, 'store']);
    Route::post('login', [UserController::class, 'login']);
    Route::post('sendTokenRecover', [UserController::class, 'sendTokenRecover']);
    Route::put('resetPassword', [UserController::class, 'resetPassword']);
    
    Route::get('bannerIndex', [BannerController::class, 'index']);
    Route::get('downloadImage/{id}', [BannerController::class, 'downloadImage']);
    Route::get('businessIndex', [BusinessController::class, 'index']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('businessAll', [BusinessController::class, 'indexAll']);
        Route::apiResource('business', BusinessController::class);
        Route::apiResource('banner', BannerController::class);
        Route::put('banner/update/{id}', [BannerController::class, 'update']);
        Route::apiResource('user', UserController::class);
        Route::post('logout', [UserController::class, 'logout']);
    });
});

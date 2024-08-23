<?php

use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::post('user', [UserController::class, 'store']);
    Route::post('login', [UserController::class, 'login']);
    Route::post('sendTokenRecover', [UserController::class, 'sendTokenRecover']);
    Route::put('resetPassword', [UserController::class, 'resetPassword']);
    
    Route::get('bannerIndex', [BannerController::class, 'index']);
    Route::get('downLoadImage/{id}', [BannerController::class, 'downLoadImage']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('banner/update/{id}', [BannerController::class, 'update']);
        Route::apiResource('banner', BannerController::class);
        Route::apiResource('user', UserController::class);
        Route::post('logout', [UserController::class, 'logout']);
    });
});

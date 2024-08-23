<?php

namespace App\Providers;

use App\Events\UserRecoverPassword;
use App\Listeners\SendEmailRecoverPasswordListener;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    protected $listen = [
        UserRecoverPassword::class => [
            SendEmailRecoverPasswordListener::class
        ]
    ];
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}

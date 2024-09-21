<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    use HasFactory, HasUlids;


    protected $table = 'business';
    protected $primaryKey = 'idBusiness';
    protected $fillable = [
        'campanha',
        'cliente',
        'agencia',
        'destaque',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'banners';
    protected $primaryKey = 'idBanner';
    protected $fillable = [
        'nameMidia',
        'veiculo',
        'dimensao',
        'tamanho',
        'looping',
        'tempo',
        'complexidade',
        'tipo',
        'statusBanner',
    ];

}

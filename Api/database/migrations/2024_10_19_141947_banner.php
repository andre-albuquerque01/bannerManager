<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('banners', function (Blueprint $table) {
            $table->ulid('idBanner')->primary();
            $table->string('title');
            $table->string('urlMidia');
            $table->string('veiculo')->default('Outro')->nullable(true);
            $table->string('dimensao')->default('Indeterminado')->nullable(true);
            $table->string('extensionMidia');
            $table->string('tamanho');
            $table->string('tempo')->default('Indeterminado')->nullable(true);
            $table->string('tipo')->default('Desenvolvimento')->nullable(true);
            $table->string('statusBanner')->default('Aguardando Aprovação')->nullable(true);
            // Para vincular cada Banner ao uma campanha ou empresa (Business)
            // $table->index('idBusiness');
            // $table->foreignUlid('idBusiness')->references('idBusiness')->on('business')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banners');
    }
};

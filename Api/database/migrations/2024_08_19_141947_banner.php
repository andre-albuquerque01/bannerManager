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
            $table->string('nameMidia');
            $table->string('veiculo')->default('Outro')->nullable(true);
            $table->string('dimensao')->default('Indeterminado')->nullable(true);
            $table->string('tamanho');
            $table->string('looping')->default('Indeterminado')->nullable(true);
            $table->string('tempo')->default('Indeterminado')->nullable(true);
            $table->string('complexidade');
            $table->string('tipo')->default('Desenvolvimento')->nullable(true);
            $table->string('statusBanner')->default('Aguardando Aprovação')->nullable(true);
            // $table->index('idUser');
            // $table->foreignUlid('idUser')->references('idUser')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

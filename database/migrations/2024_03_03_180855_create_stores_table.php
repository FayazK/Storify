<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up() : void
    {
        Schema::create( 'stores', function( Blueprint $table ) {
            $table->id();
            $table->string( 'name' );
            $table->timestamps();
            $table->softDeletes();
        } );
        // Add Store ID to user table
        Schema::table( 'users', function( Blueprint $table ) {
            $table->foreignId( 'store_id' )->constrained( 'stores' )->restrictOnDelete();
        } );
    }

    /**
     * Reverse the migrations.
     */
    public function down() : void
    {
        Schema::dropIfExists( 'stores' );
        Schema::table( 'users', function( Blueprint $table ) {
            $table->dropForeign( [ 'store_id' ] );
            $table->dropColumn( 'store_id' );
        } );
    }
};

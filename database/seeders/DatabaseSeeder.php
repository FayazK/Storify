<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $store = Store::create([
            'name' => 'Mihrimah Studio',
        ]);
        User::create([
            'name' => 'Fayaz K',
            'email' => 'info@fayazk.com',
            'password' => bcrypt('password'),
            'store_id' => $store->id,
        ]);
        User::factory(1000)->create();
    }
}

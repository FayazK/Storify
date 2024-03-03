<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use WendellAdriel\Lift\Attributes\Cast;
use WendellAdriel\Lift\Attributes\Fillable;
use WendellAdriel\Lift\Attributes\Hidden;
use WendellAdriel\Lift\Attributes\Relations\BelongsTo;
use WendellAdriel\Lift\Attributes\Rules;
use WendellAdriel\Lift\Lift;

/**
 *
 * @mixin Builder
 */
#[BelongsTo( Store::class, 'store' )]
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Lift;

    #[Cast( 'string' )]
    #[Fillable]
    #[Rules( [ 'required', 'string', 'max:255' ] )]
    public string $name;

    #[Cast( 'string' )]
    #[Fillable]
    #[Rules( [ 'required', 'string', 'email', 'max:255', 'unique:users' ] )]
    public string $email;

    #[Cast( 'hashed' )]
    #[Fillable]
    #[Hidden]
    #[Rules( [ 'required', 'string', 'min:8' ] )]
    public string $password;

    #[Cast( 'int' )]
    #[Fillable]
    public int $store_id;

    #[Hidden]
    public string $remember_token;

    #[Cast( 'datetime' )]
    public string $email_verified_at;

}// User

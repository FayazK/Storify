<?php

namespace App\Http\Middleware;

use App\Helpers\UserHelper;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class InitGlobals
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle( Request $request, Closure $next ) : Response
    {
        if( Auth::check() ) {
            UserHelper::$user = Auth::user();
        }
        return $next( $request );
    }// handle
}

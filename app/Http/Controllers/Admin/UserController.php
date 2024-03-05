<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {
        return inertia('Admin/Users/Index');
    }// index

    public function all()
    {
        return new UserCollection(User::paginate(25));
    }// all

}// UserController

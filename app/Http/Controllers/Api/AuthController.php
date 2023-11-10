<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
      $credentials =$request->validated();
      /** @var \App\Models\User $user */
      if(!Auth::attempt($credentials)){
        return response()->json([
            'message' => 'Provide email address or password is incorrect']);
      }
    /** @var User $user */
      $user = Auth::user();
      $token =  $user->createToken('main')->createToken('main')->plainTextToken;
    }

    public function signup(SignupRequest $request){
        $data = $request->validated();
        $user=User::create([
            'name' => $data['name'],
            'email'=> $data['email'],
            'password'=> bcrypt($data['password']),
        ]);
      $token = $user->createToken('main')->plainTextToken;
      return response(compact('user', 'token'));
    }
    public function logout(Request $request){
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('',204 );
    }
}

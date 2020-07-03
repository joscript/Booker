<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('bookables', 'API\BookableController@index');

// Route::get('bookables/{id}', 'API\BookableController@show');

Route::apiResource('bookables', 'API\BookableController')->only(['index', 'show']);
Route::get('bookables/{id}/availability', 'API\BookableAvailabilityController')
    ->name('bookables.availability.show');
Route::get('bookables/{id}/reviews', 'API\BookableReviewController')
    ->name('bookables.reviews.index');
Route::get('bookables/{id}/price', 'API\BookablePriceController')
    ->name('bookables.price.show');

Route::get('booking-by-review/{review_key}', 'API\BookingReviewController')
    ->name('booking.by_review.show');

Route::apiResource('reviews', 'API\ReviewController')->only(['show', 'store']);



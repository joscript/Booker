<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use Illuminate\Http\Request;
use App\Booking;

use App\Review;

class ReviewController extends Controller
{
    public function show($review_id){
        return new ReviewResource(
            Review::findOrFail($review_id)
        );
    }

    public function store(Request $request){
        $data = $request->validate([
            'id'=> 'required|size:36|unique:reviews',
            'content'   =>  'required|min:3',
            'rating'    =>  'required|in:1,2,3,4,5'
        ]);

        $booking= Booking::findByReviewKey($data['id']);

        if($booking === null) return abort(404);

        $booking->review_key = '';
        $booking->save();

        $review = Review::make($data);
        $review->booking_id = $booking->id;
        $review->bookable_id = $booking->bookable_id;
        $review->save();

        return new ReviewResource($review);

    }
}

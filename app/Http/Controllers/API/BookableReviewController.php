<?php

namespace App\Http\Controllers\API;

use App\Bookable;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Resources\BookableReviewIndexResource;
class BookableReviewController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, $id)
    {
        $bookable = Bookable::findOrFail($id);
        return BookableReviewIndexResource::collection(
            $bookable->reviews()->latest()->get()
        );

    }
}

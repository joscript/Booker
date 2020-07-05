<?php

namespace App\Http\Controllers\API;

use App\Bookable;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BookablePriceController extends Controller
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

        $data = $request->validate([
            'from'  => 'required|date_format:Y-m-d|',
            'to'    => 'required|date_format:Y-m-d|after_or_equal:from'
        ]);

        return response()->json([
            'data' => $bookable->priceFor($data['from'], $data['to'])
        ]);
    }
}

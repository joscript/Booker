<?php

use Illuminate\Database\Seeder;
use App\Bookable;
use App\Review;

class ReviewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Bookable::all()->each(function(Bookable $bookable) {
            $reviews = factory(Review::class, random_int(5, 30))->make();
            $bookable->reviews()->saveMany($reviews);
        });
    }
}

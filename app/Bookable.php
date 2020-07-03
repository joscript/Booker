<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Bookable extends Model
{
    public function bookings(){
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function availableFor($from, $to): bool // function return type
    {
        return 0 === $this->bookings()->betweenDates($from, $to)->count();
        // This is a Query scopes (betweenDates) : this return 0 if bookables are available and 1 if it is not available
    }
}

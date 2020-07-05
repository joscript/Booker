<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class Booking extends Model
{
    protected $fillable = ['from', 'to'];

    public function bookable(){
        return $this->belongsTo(Bookable::class);
    }

    public function reviews(){
        return $this->hasOne(Review::class);
    }

    public function address(){
        return $this->belongsTo(Address::class);
    }

    public function scopeBetweenDates(Builder $query, $from, $to) // query scope
    {
        return $query->where('to', '>=', $from) // checking the availability
            ->where('from', '<=', $to);
    }

    public static function findByReviewKey(string $reviewKey) : ?Booking
    {
        return static::where('review_key', $reviewKey)->with('bookable')->first();
    }

    protected static function boot(){
        parent::boot();

        static::creating(function ($booking){
            $booking->review_key = Str::uuid();
        });
    }
}

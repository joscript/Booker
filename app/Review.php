<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
      protected $fillable = ['id', 'content', 'rating'];

      public function getIncrementing() // built in function that modified coz we aret returning string id instead of integer
      {
          return false;
      }

      public function getKeyType() // built in function that modified
      {
          return 'string';
      }

      public function bookables(){
          return $this->belongsTo(Bookable::class);
      }

    public function bookings(){
        return $this->belongsTo(Booking::class);
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Access extends Model
{
    use HasFactory;
    protected $fillable = ['country', 'date_time'];
    protected $hidden = ['created_at', 'updated_at'];
}

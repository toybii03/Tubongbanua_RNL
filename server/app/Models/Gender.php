<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;

class Gender extends Model
{
    use Hasfactory, Notifiable;

    protected $table = 'tbl_genders';
    protected $primaryKey = 'gender_id';
    protected $fillable = [
        'gender',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'gender_id', 'gender_id');
    }
}

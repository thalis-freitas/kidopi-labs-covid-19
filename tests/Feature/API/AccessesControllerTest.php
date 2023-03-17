<?php

namespace Tests\Feature\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;
use App\Models\Access;

class AccessesControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_post_accesses_endpoint(): void
    {
        $access = Access::factory(1)->makeOne()->toArray();
        $response = $this->postJson('/api/accesses', $access);
        $response->assertStatus(201);

        $response->assertJson(function(AssertableJson $json) use($access){
            $json->hasAll(['id', 'country', 'created_at']);
            $json->whereAll(['country' => $access['country']])->etc();
        });
    }
}

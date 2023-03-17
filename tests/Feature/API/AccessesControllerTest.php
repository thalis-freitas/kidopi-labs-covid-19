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

    public function test_get_last_access_endpoint(): void
    {
        $accesses = Access::factory(2)->create();
        $last_access = $accesses->last();
        $response = $this->getJson('/api/accesses/last');
        $response->assertStatus(200);

        $response->assertJson(function(AssertableJson $json) use($last_access){
            $json->hasAll(['id', 'country', 'created_at']);
            $json->whereAllType(['id' => 'integer', 'country' => 'string']);
            $json->whereAll(['country' => $last_access->country]);
        });
    }

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

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
            $json->hasAll(['id', 'country', 'date_time']);
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
            $json->hasAll(['message', 'data.country', 'data.date_time', 'data.id']);
            $json->whereAll([
                'message' => 'Acesso registrado com sucesso!',
                'data.country' => $access['country']])->etc();
        });
    }

    public function test_post_validate_required_fields_on_create_accesses(): void
    {
        $response = $this->postJson('/api/accesses', []);
        $response->assertUnprocessable();

        $response->assertJson(function(AssertableJson $json){
            $json->hasAll(['message', 'errors']);
            $json->where('errors.country.0', 'O campo país não pode ficar em branco.')
                 ->where('errors.date_time.0', 'O campo data não pode ficar em branco.');
        });
    }

    public function test_post_validate_date_time_format_on_create_accesses(): void
    {
        $response = $this->postJson('/api/accesses', ["country" => "Canada",
                                                      "date_time" => "20-03-2023 17:20:34"]);
        $response->assertUnprocessable();

        $response->assertJson(function(AssertableJson $json){
            $json->hasAll(['message', 'errors']);
            $json->where('errors.date_time.0', 'O campo data deve estar no formato Y-m-d H:i:s.');
        });
    }
}

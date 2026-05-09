package edu.cit.arong.pawfolio.mobile

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {

    @POST("api/auth/login")
    fun login(@Body user: User): Call<ApiResponse>

    @POST("api/auth/register")
    fun register(@Body user: User): Call<ApiResponse>
}
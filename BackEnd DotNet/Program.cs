using FormulaOne.ChatService.DataService;
using FormulaOne.ChatService.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddSignalR();

// Enable CORS for React frontend (adjust port if needed)
builder.Services.AddCors(options =>
{
    options.AddPolicy("reactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Your React app URL & port
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddSingleton<SharedDb>();

// Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "FormulaOne Chat Service API",
        Version = "v1",
        Description = "This API includes a SignalR WebSocket endpoint at `/chat` for real-time communication."
    });
});

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "FormulaOne Chat Service API v1");
    });
}

app.UseHttpsRedirection();

// Apply CORS before Authorization
app.UseCors("reactApp");

app.UseAuthorization();

app.MapControllers();

// SignalR WebSocket endpoint (lowercase `/chat` to match frontend)
app.MapHub<ChatHub>("/chat");

app.Run();

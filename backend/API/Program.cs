using System.Reflection;
using API.Misc;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;


var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddUserSecrets(Assembly.GetExecutingAssembly());
Config.Instance = builder.Configuration.Get<Config>();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Longikid api", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
    option.SupportNonNullableReferenceTypes();
});

builder.Services.AddAuthentication()
    .AddJwtBearer(x =>
    {
        var keycloakConfig = Config.Instance.Keycloak; // Access Keycloak configuration

        x.RequireHttpsMetadata = keycloakConfig.RequireHttps;
        x.MetadataAddress = $"{keycloakConfig.ServerUrl}/realms/kirakovacs.com/.well-known/openid-configuration";
        x.TokenValidationParameters = new TokenValidationParameters
        {
            RoleClaimType = "groups",
            NameClaimType = keycloakConfig.NameClaim,
            ValidAudience = keycloakConfig.Audience,
            ValidateIssuer = keycloakConfig.ValidateIssuer
        };
        
    });



builder.Services.AddAuthorization(o =>
{
    o.DefaultPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        //.RequireClaim("email_verified", "true")
        .Build();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    
    app.UseSwaggerUI(options =>
    {
        
        options.EnableTryItOutByDefault();
    });
}

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

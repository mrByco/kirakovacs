using System.Reflection;
using Newtonsoft.Json;

namespace API.Misc;

public class LogLevelConfig
{
    [JsonProperty("Default")] public string? Default { get; set; }

    [JsonProperty("Microsoft")] public string? Microsoft { get; set; }

    [JsonProperty("Microsoft.Hosting.Lifetime")]
    public string? MicrosoftHosting { get; set; }
}


public class KeycloakConfig
{
    public string? ServerUrl { get; set; }
    public string? Audience { get; set; }

    public string? NameClaim { get; set; }

    public bool RequireHttps { get; set; }

    public bool ValidateIssuer { get; set; }
}

public class Version
{
    [JsonProperty("version")] public string? Value { get; set; }
}

public class Config
{
    
    public KeycloakConfig Keycloak { get; set; }
    
    [System.Text.Json.Serialization.JsonIgnore]
    public static Config Instance { get; set; }
}
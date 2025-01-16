// Import necessary namespaces for the function
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Azure.SignalR.Management;
using Newtonsoft.Json;
using System.Threading.Tasks;

public static class SendMessage
{
    // Define the SignalR connection string (replace this with your actual connection string)
    private static readonly string connectionString = "YOUR_SIGNALR_CONNECTION_STRING";

    // Create a HubContext to interact with SignalR
    private static readonly ServiceHubContext hubContext = new ServiceManagerBuilder()
        .WithOptions(o => o.ConnectionString = connectionString)
        .BuildServiceManager()
        .CreateHubContextAsync("chatHub")
        .Result;

    // Define the SendMessage function
    [FunctionName("SendMessage")]
    public static async Task<IActionResult> Run(
        // Trigger the function using an HTTP POST request
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        // Read the request body
        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

        // Deserialize the request body into a dynamic object
        dynamic data = JsonConvert.DeserializeObject(requestBody);

        // Extract the message from the request body
        string message = data?.message;

        // Send the message to all connected SignalR clients
        await hubContext.Clients.All.SendAsync("ReceiveMessage", message);

        // Return a response indicating the message was sent successfully
        return new OkObjectResult("Message sent");
    }
}
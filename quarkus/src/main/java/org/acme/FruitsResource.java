package org.acme;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.eclipse.microprofile.openapi.annotations.Operation;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/fruits")
public class FruitsResource {

    record FruitsResponse(List<Fruit> fruits) {

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public FruitsResponse getFruits() {
        return new FruitsResponse(Fruit.listAll());
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getFruitById")
    public Optional<Fruit> getFruitById(@PathParam("id") Long id) {
        return Fruit.find("id", id).firstResultOptional();
    }

    @GET
    @Path("/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getFruitByName")
    public Optional<Fruit> getFruitByName(@PathParam("name") String name) {
        return Fruit.getFruitByName(name);
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "createFruit")
    public Response createFruit(Fruit fruit) {
        fruit.persist();
        return Response.created(URI.create("/fruit/" + fruit.name)).build();
    }
}

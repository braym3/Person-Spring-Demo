package com.qa.people.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.people.dto.PersonDTO;
import com.qa.people.dto.PersonReqDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT) // loads the app context with all your beans
@AutoConfigureMockMvc // sets up the testing library
@Sql(scripts = {"classpath:person-schema.sql", "classpath:person-data.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
public class PersonIntegrationTest {

    @Autowired // tells Spring to inject the mvc object into my test class
    private MockMvc mvc;

    @Autowired // <--------
    private ObjectMapper mapper;

    
}

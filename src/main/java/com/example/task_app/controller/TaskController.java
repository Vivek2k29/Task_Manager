package com.example.task_app.controller;

import com.example.task_app.model.Task;
import com.example.task_app.repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:8080")
public class TaskController {


    private final TaskRepo taskRepo;

    public TaskController(TaskRepo taskRepo){
        this.taskRepo=taskRepo;
    }
    @GetMapping
    public List<com.example.task_app.model.Task> getTask(){
        return taskRepo.findAll();
    }
    @PostMapping
    public Task addTask(@RequestBody Task task){
        return taskRepo.save(task);
    }
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        taskRepo.deleteById(id);
    }
}

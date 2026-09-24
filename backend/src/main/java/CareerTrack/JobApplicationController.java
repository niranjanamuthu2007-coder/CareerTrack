package CareerTrack;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobApplicationController {

    private final JobApplicationRepository repository;

    public JobApplicationController(JobApplicationRepository repository) {
        this.repository = repository;
    }

    // GET all jobs
    @GetMapping
    public List<JobApplication> getAllJobs() {
        return repository.findAll();
    }

    // GET one job
    @GetMapping("/{id}")
    public ResponseEntity<JobApplication> getJobById(
            @PathVariable Integer id) {

        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE job
    @PostMapping
    public JobApplication createJob(
            @RequestBody JobApplication job) {

        return repository.save(job);
    }

    // UPDATE job
    @PutMapping("/{id}")
    public ResponseEntity<JobApplication> updateJob(
            @PathVariable Integer id,
            @RequestBody JobApplication jobDetails) {

        return repository.findById(id)
                .map(job -> {

                    job.setCompany(jobDetails.getCompany());
                    job.setPosition(jobDetails.getPosition());
                    job.setLocation(jobDetails.getLocation());
                    job.setApplicationDate(
                            jobDetails.getApplicationDate()
                    );
                    job.setStatus(jobDetails.getStatus());

                    return ResponseEntity.ok(
                            repository.save(job)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE job
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(
            @PathVariable Integer id) {

        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
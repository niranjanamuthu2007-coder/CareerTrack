package CareerTrack;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final JobApplicationRepository jobRepository;

    public DashboardController(
            JobApplicationRepository jobRepository) {

        this.jobRepository = jobRepository;
    }

    @GetMapping("/{userId}")
    public Map<String, Object> getDashboardData(
            @PathVariable Integer userId) {

        var jobs =
                jobRepository.findAll()
                        .stream()
                        .filter(job ->
                                job.getUserId()
                                        .equals(userId))
                        .toList();

        long total =
                jobs.size();

        long applied =
                jobs.stream()
                        .filter(job ->
                                "Applied".equals(
                                        job.getStatus()))
                        .count();

        long interview =
                jobs.stream()
                        .filter(job ->
                                "Interview".equals(
                                        job.getStatus()))
                        .count();

        long selected =
                jobs.stream()
                        .filter(job ->
                                "Selected".equals(
                                        job.getStatus()))
                        .count();

        long rejected =
                jobs.stream()
                        .filter(job ->
                                "Rejected".equals(
                                        job.getStatus()))
                        .count();

        Map<String, Object> dashboard =
                new HashMap<>();

        dashboard.put("totalApplications", total);
        dashboard.put("applied", applied);
        dashboard.put("interview", interview);
        dashboard.put("selected", selected);
        dashboard.put("rejected", rejected);

        return dashboard;
    }
}
package CareerTrack;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository
        extends JpaRepository<JobApplication, Integer> {

    List<JobApplication> findByUserId(Integer userId);
}
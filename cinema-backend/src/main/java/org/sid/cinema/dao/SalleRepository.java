package org.sid.cinema.dao;

import org.sid.cinema.entities.Salle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("*")
public interface SalleRepository extends JpaRepository<Salle,Long> {

}

package org.sid.cinema.dao;

import org.sid.cinema.entities.Ville;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin("*")
public interface VilleRepository extends JpaRepository<Ville,Long>{

}

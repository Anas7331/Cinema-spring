package org.sid.cinema.dao;

import org.sid.cinema.entities.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("*")
public interface CategoryRepository extends JpaRepository<Categorie,Long> {

}

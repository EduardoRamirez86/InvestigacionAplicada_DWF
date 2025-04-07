package sv.edu.udb.InvestigacionDwf.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sv.edu.udb.InvestigacionDwf.model.Ropa;
import sv.edu.udb.InvestigacionDwf.repository.RopaRespository;

@RestController
@RequestMapping("/ropa")
public class RopaController {

    private final RopaRespository ropaRepository;

    public RopaController(RopaRespository ropaRepository) {
        this.ropaRepository = ropaRepository;
    }

    @GetMapping
    public List<Ropa> getAllRopa() {
        return ropaRepository.findAll();
    }

    @PostMapping
    public Ropa createRopa(@RequestBody Ropa ropa) {
        return ropaRepository.save(ropa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ropa> updateRopa(@PathVariable Long id, @RequestBody Ropa ropaDetails) {
        return ropaRepository.findById(id)
                .map(ropa -> {
                    ropa.setNombre(ropaDetails.getNombre());
                    ropa.setPrecio(ropaDetails.getPrecio());
                    return ResponseEntity.ok(ropaRepository.save(ropa));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRopa(@PathVariable Long id) {
        return ropaRepository.findById(id)
                .map(ropa -> {
                    ropaRepository.delete(ropa);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  Trash2,
  Edit,
  Plus,
  Package,
  DollarSign,
  MapPin,
  CheckCircle,
  Filter,
  Grid3x3,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  getServices,
  createService,
  updateService,
  deleteService
} from "@/lib/db-local";
import type { Service } from "@/types";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Omit<Service, "id">>({
    title: "",
    description: "",
    icon: "truck",
    price: "",
    area: "",
    image: "/images/services/default.jpg",
    features: []
  });
  const [selectedArea, setSelectedArea] = useState<string>("Tümü");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = getServices();
      await Promise.resolve();
      setServices(data);
    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadServices();
  }, []);

  const handleFilterChange = (area: string) => {
    setSelectedArea(area);
    setCurrentPage(1);
  };

  const filteredServices = selectedArea === "Tümü"
    ? services
    : services.filter(s => s.area === selectedArea);

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openAddDialog = () => {
    setEditingService(null);
    setFormData({
      title: "",
      description: "",
      icon: "truck",
      price: "",
      area: "",
      image: "/images/services/default.jpg",
      features: []
    });
    setDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData(service);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.area) {
      alert("Lütfen gerekli alanları doldurun");
      return;
    }

    try {
      if (editingService) {
        updateService(editingService.id, formData);
        toast.success("Hizmet güncellendi");
      } else {
        createService(formData);
        toast.success("Hizmet eklendi");
      }
      setDialogOpen(false);
      loadServices();
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("Kaydetme hatası");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bu hizmeti silmek istediğinizden emin misiniz?")) {
      try {
        deleteService(id);
        toast.success("Hizmet silindi");
        loadServices();
      } catch (error) {
        console.error("Error deleting service:", error);
        toast.error("Silme hatası");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hizmetler</h1>
          <p className="text-gray-600 mt-1">Tüm çekici ve yolyardım hizmetlerini yönetin</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="h-10 px-4 rounded-l-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-10 px-4 rounded-r-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <Button onClick={openAddDialog} className="h-12 px-6 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
            <Plus className="w-5 h-5 mr-2" />
            Yeni Hizmet Ekle
          </Button>
        </div>
      </div>

      {/* Area Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Filtrele:</span>
            <Button
              variant={selectedArea === "Tümü" ? "default" : "outline"}
              onClick={() => handleFilterChange("Tümü")}
              className="h-9 px-4"
            >
              Tümü ({services.length})
            </Button>
            <Button
              variant={selectedArea === "Şehir içi" ? "default" : "outline"}
              onClick={() => handleFilterChange("Şehir içi")}
              className="h-9 px-4"
            >
              Şehir içi
            </Button>
            <Button
              variant={selectedArea === "Şehirlerarası" ? "default" : "outline"}
              onClick={() => handleFilterChange("Şehirlerarası")}
              className="h-9 px-4"
            >
              Şehirlerarası
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      {viewMode === "table" ? (
        <Card>
          <CardHeader>
            <CardTitle>Hizmet Listesi</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600"></div>
                <p className="text-gray-600 mt-4">Yükleniyor...</p>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hizmet</TableHead>
                      <TableHead>Fiyat</TableHead>
                      <TableHead>Alan</TableHead>
                      <TableHead>Özellikler</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedServices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-600 py-12">
                          <div className="flex flex-col items-center justify-center">
                            <Package className="w-12 h-12 text-gray-400 mb-2" />
                            <p className="text-sm">
                              {selectedArea === "Tümü"
                                ? "Henüz hizmet eklenmemiş"
                                : `${selectedArea} kategorisi için hizmet eklenmemiş`}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Yeni hizmet eklemek için &apos;Yeni Hizmet Ekle&apos; butonuna tıklayın</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedServices.map((service) => (
                        <TableRow key={service.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-navy-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{service.title}</div>
                                <div className="text-sm text-gray-500">{service.description.substring(0, 50)}...</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-green-600">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {service.price}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-gray-700">
                              <MapPin className="w-4 h-4 mr-1" />
                              {service.area}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {service.features.slice(0, 2).map((feature, i) => (
                                <span key={i} className="inline-flex items-center px-2 py-1 bg-navy-50 text-navy-600 text-xs rounded-md">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  {feature}
                                </span>
                              ))}
                              {service.features.length > 2 && (
                                <span className="text-xs text-gray-500">+{service.features.length - 2}</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(service)}
                                className="h-8 px-3"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(service.id)}
                                className="h-8 px-3"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="h-10 px-4"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Önceki
                    </Button>
                    <span className="text-sm text-gray-600">
                      Sayfa {currentPage} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="h-10 px-4"
                    >
                      Sonraki
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-64 animate-pulse">
                <CardHeader className="space-y-4">
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                </CardHeader>
              </Card>
            ))
          ) : paginatedServices.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {selectedArea === "Tümü"
                  ? "Henüz hizmet eklenmemiş"
                  : `${selectedArea} kategorisi için hizmet eklenmemiş`}
              </p>
            </div>
          ) : (
            paginatedServices.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center">
                  <Package className="w-16 h-16 text-navy-600" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center text-green-600 font-medium">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {service.price}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-1" />
                      {service.area}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <span key={i} className="inline-flex items-center px-2 py-1 bg-navy-50 text-navy-600 text-xs rounded-md">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(service)}
                      className="flex-1 h-9 hover:bg-navy-50 hover:text-navy-900 hover:border-navy-300 hover:shadow-md transition-all duration-200"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Düzenle
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                      className="flex-1 h-9 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Sil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle>{editingService ? "Hizmet Düzenle" : "Yeni Hizmet Ekle"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hizmet Başlığı *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Örn: Park Çekiği"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Hizmet hakkında detaylı açıklama..."
                rows={4}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fiyat *
                </label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Örn: ₺500-1000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alan *
                </label>
                <NativeSelect
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  required
                >
                  <option value="">Seçiniz</option>
                  <option value="Şehir içi">Şehir içi</option>
                  <option value="Şehirlerarası">Şehirlerarası</option>
                  <option value="Tümü">Tümü</option>
                </NativeSelect>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İkon (Lucide icon adı)
              </label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="truck, help-circle, alert-triangle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Özellikler
              </label>
              <Textarea
                value={formData.features.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    features: e.target.value.split(",").map((f) => f.trim())
                  })
                }
                placeholder="Özellik 1, Özellik 2, Özellik 3"
                rows={2}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                İptal
              </Button>
              <Button type="submit" className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white">
                {editingService ? "Güncelle" : "Kaydet"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

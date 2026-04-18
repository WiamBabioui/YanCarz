using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using YanCarz.Domain.Entities;
using YanCarz.Domain.Interfaces;
using YanCarz.Infrastructure.Data;

namespace YanCarz.Infrastructure.Repository
{
    public class ResearchRequestRepository : IResearchRequestRepository
    {
        private readonly YanCarzDbContext _context;

        public ResearchRequestRepository(YanCarzDbContext context)
        {
            _context = context;
        }
        public async Task AddAsync(ResearchRequest obj)
        {
            await _context.ResearchRequests.AddAsync(obj);
            await _context.SaveChangesAsync();
        }

    }
}
